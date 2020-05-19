export default ({ redirect }) => {
  if (!localStorage.getItem('token')) {
    redirect('/login');
  }
};
