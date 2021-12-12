import AdminLogin from '../components/AdminLogin/AdminLogin';
import GenericPageBuilder from './GenericPageBuilder'

const AdminPageBuilder = (props) => (
    <div>
        <GenericPageBuilder/>
        <AdminLogin {...props} />
    </div>
);

export default AdminPageBuilder;