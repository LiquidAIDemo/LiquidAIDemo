import optimizerImage from "../../assets/optimizer.png";
import optimizerBorder from "../../assets/optimizer_border.png";
import downloadIcon from "../../assets/download.png";
import uploadIcon from "../../assets/upload.png";

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
          top: '43.8%',
          left: '88.4%',
          width: '5%',
          height: '4.5%',
      }}
      />
      <img
          id="optimizer"
          src={optimizerImage}
          alt='optimizer'
          className='optimizer-image'
          style={{
          position: 'absolute',
          top: '44.25%',
          left: '89%',
          width: '4%',
          height: '3.5%',
          }}
      />
      <img
        id="download-icon"
        src={downloadIcon}
        alt="download-icon"
        className="download-icon"
        style={{
          position: 'absolute',
          top: '43.8%',
          left: '88%',
          width: '2.5%',
          height: '2.5%',
        }}
      />
      <img
        id="upload-icon"
        src={uploadIcon}
        alt="upload-icon"
        className="upload-icon"
        style={{
          position: 'absolute',
          top: '46%',
          left: '88%',
          width: '2.5%',
          height: '2.5%',
        }}
      />
    </div>
  )
}

export default Optimizer;