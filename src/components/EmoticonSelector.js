import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMehBlank, faSmile, faGrinStars, faFrown, faAngry } from '@fortawesome/free-solid-svg-icons'

const EmoticonSelector = ({value, handleEmotionChange}) => {
    return (
        <span className="emotion-selector">
            <label htmlFor="neutral">
                <input type="radio" name="emotion" value="neutral" id="neutral" checked={value === 'neutral'} onChange={handleEmotionChange} />
                <FontAwesomeIcon icon={faMehBlank} />
            </label>

            <label htmlFor="happy">
                <input type="radio" name="emotion" value="happy" id="happy" checked={value === 'happy'} onChange={handleEmotionChange} />
                <FontAwesomeIcon icon={faSmile} />
            </label>

            <label htmlFor="excited">
                <input type="radio" name="emotion" value="excited" id="excited" checked={value === 'excited'} onChange={handleEmotionChange} />
                <FontAwesomeIcon icon={faGrinStars} />
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