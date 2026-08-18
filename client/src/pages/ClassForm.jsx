import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api.js';
import Loader from '../components/Loader.jsx';

const blank = { studentId: '', course: '', teacher: '', date: '', time: '', status: 'SCHEDULED' };

export default function ClassForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState(blank);
  const [students, setStudents] = useState();
  const [loading, setLoading] = useState(id !== 'new');

  useEffect(() => {
    api.get('/students').then(response => setStudents(response.data.data.students.filter(student => student.status === 'ACTIVE'))).catch(() => toast.error('Could not load students'));
    if (id !== 'new') {
      api.get(`/classes/${id}`).then(response => {
        const item = response.data.data.class;
        setForm({ ...item, studentId: item.studentId?._id || item.studentId, date: item.date.slice(0, 10) });
      }).catch(() => toast.error('Could not load class')).finally(() => setLoading(false));
    }
  }, [id]);

  const set = (key, value) => setForm(current => ({ ...current, [key]: value }));
  const chooseStudent = value => {
    const student = students?.find(item => item._id === value);
    setForm(current => ({ ...current, studentId: value, course: current.course || student?.course || '' }));
  };
  const submit = async event => {
    event.preventDefault();
    const payload = { ...form, date: new Date(`${form.date}T00:00:00`).toISOString() };
    try {
      if (id === 'new') await api.post('/classes', payload); else await api.put(`/classes/${id}`, payload);
      toast.success(id === 'new' ? 'Class scheduled' : 'Class updated');
      nav('/admin/classes');
    } catch (error) { toast.error(error.response?.data?.message || 'Could not save class'); }
  };

  if (loading || !students) return <Loader/>;
  return <div className="page form-page"><div className="page-head"><div><h2>{id === 'new' ? 'Schedule class' : 'Edit class'}</h2><p>Set the student, teacher, date and time for this session.</p></div></div><form className="panel form-grid" onSubmit={submit}>
    <label>Student<select value={form.studentId} onChange={event => chooseStudent(event.target.value)} required><option value="">Select a student</option>{students.map(student => <option key={student._id} value={student._id}>{student.name} — {student.course}</option>)}</select></label>
    <label>Course<input value={form.course} onChange={event => set('course', event.target.value)} required/></label>
    <label>Teacher<input value={form.teacher} onChange={event => set('teacher', event.target.value)} required/></label>
    <label>Date<input type="date" value={form.date} onChange={event => set('date', event.target.value)} required/></label>
    <label>Time<input type="time" value={form.time} onChange={event => set('time', event.target.value)} required/></label>
    <label>Status<select value={form.status} onChange={event => set('status', event.target.value)}><option value="SCHEDULED">Scheduled</option><option value="COMPLETED">Completed</option><option value="CANCELLED">Cancelled</option></select></label>
    <div className="form-actions"><button className="secondary" type="button" onClick={() => nav('/admin/classes')}>Cancel</button><button className="primary">{id === 'new' ? 'Schedule class' : 'Save changes'}</button></div>
  </form></div>;
}
