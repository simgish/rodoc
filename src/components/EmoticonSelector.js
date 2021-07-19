import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons'

const EmoticonSelector = ({onSelectEmotion}) => {
    return (
        <span className="emotion-selector" onChange={onSelectEmotion}>
            <input type="radio" name="emotion" value="happy"  />
            <label for="happy">
                <FontAwesomeIcon icon={faSmile} />
            </label>

            <input type="radio" name="emotion" value="sad" />
            <label for="sad">
                <FontAwesomeIcon icon={faFrown} />
            </label>
        </span>
    );
};

export default EmoticonSelector;