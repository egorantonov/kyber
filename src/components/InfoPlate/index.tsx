interface InfoPlateProps {
    message: string
}

const InfoPlate = ({ message }: InfoPlateProps) => {

  return (

    <li className="server" style={{ justifyContent: 'space-around' }}>
      <div className="info-plate">
        <span className="uppercase">{message}</span>
      </div>
    </li>

  )
}

export default InfoPlate