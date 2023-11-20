import optimizerImage from "../../assets/optimizer.png";
import optimizerBorder from "../../assets/optimizer_border.png";

const Optimizer = () => {
  return (
    <div>
        <img
        id="optimizer-border"
        src={optimizerBorder}
        alt="border"
        className="optimizer-border"
        style={{
            position: 'absolute',
            top: '44.2%',
            left: '90%',
            width: '5.5%',
            height: '5%',
        }}
        />
        <img
            id="optimizer"
            src={optimizerImage}
            alt='optimizer'
            className='optimizer-image'
            style={{
            position: 'absolute',
            top: '44.6%',
            left: '90.6%',
            width: '4.5%',
            height: '4%',
            }}
        />
    </div>
  )
}

export default Optimizer;