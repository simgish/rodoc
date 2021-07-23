import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons'

const EmoticonSelector = ({value, handleEmotionChange}) => {
    return (
        <span className="emotion-selector">
            <label htmlFor="happy">
                <input type="radio" name="emotion" value="happy" id="happy" checked={value === 'happy'} onChange={handleEmotionChange} />
                <FontAwesomeIcon icon={faSmile} />
            </label>

            <label htmlFor="sad">
                <input type="radio" name="emotion" value="sad" id="sad" checked={value === 'sad'} onChange={handleEmotionChange} />
                <FontAwesomeIcon icon={faFrown} />
            </label>
        </span>
    );
};

export default EmoticonSelector;