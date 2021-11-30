import Player from '../components/Player/Player';
import GenericPageBuilder from './GenericPageBuilder'

const PlayerPageBuilder = (props) => (
    <div>
        <GenericPageBuilder/>
        <Player {...props} />
    </div>
);

export default PlayerPageBuilder;