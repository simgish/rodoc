import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons'

const EmoticonSelector = () => {
    return (
        <span className="emotion-selector">
            <label for="happy">
                <input type="radio" name="emotion" value="happy" id="happy" />
                <FontAwesomeIcon icon={faSmile} />
            </label>

            <label for="sad">
                <input type="radio" name="emotion" value="sad" id="sad" />
                <FontAwesomeIcon icon={faFrown} />
            </label>
        </span>
    );
};

export default EmoticonSelector;