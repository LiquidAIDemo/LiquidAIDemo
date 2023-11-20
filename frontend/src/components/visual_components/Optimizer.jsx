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
      <img
        id="download-icon"
        src={downloadIcon}
        alt="download-icon"
        className="download-icon"
        style={{
          position: 'absolute',
          top: '44%',
          left: '90%',
          width: '3%',
          height: '3%',
        }}
      />
      <img
        id="upload-icon"
        src={uploadIcon}
        alt="upload-icon"
        className="upload-icon"
        style={{
          position: 'absolute',
          top: '47%',
          left: '90%',
          width: '3%',
          height: '3%',
        }}
      />
    </div>
  )
}

export default Optimizer;