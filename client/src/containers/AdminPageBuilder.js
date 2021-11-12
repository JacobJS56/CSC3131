import Admin from '../components/Admin/Admin';
import GenericPageBuilder from './GenericPageBuilder'

const AdminPageBuilder = (props) => (
    <div>
        <GenericPageBuilder/>
        <Admin {...props} />
    </div>
);

export default AdminPageBuilder;