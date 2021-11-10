import Home from '../components/Home/Home';
import GenericPageBuilder from './GenericPageBuilder'

const HomePageBuilder = (props) => (
    <div>
        <GenericPageBuilder/>
        <Home {...props} />
    </div>
);

export default HomePageBuilder;