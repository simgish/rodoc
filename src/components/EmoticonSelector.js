import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faFrown, faAngry } from '@fortawesome/free-solid-svg-icons'

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

            <label htmlFor="angry">
                <input type="radio" name="emotion" value="angry" id="angry" checked={value === 'angry'} onChange={handleEmotionChange} />
                <FontAwesomeIcon icon={faAngry} />
            </label>
        </span>
    );
};

export default EmoticonSelector;