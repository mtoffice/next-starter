import Dropdown from "./Dropdown"


class BasicMode extends React.Component {

  render(){
    return(
      <React.Fragment>
        <Dropdown
          scrollID="dimenzija"
          change={this.props.changeDimension}
          value={this.props.dimensions}
          title="Dimenzija"
          values={[
            "450 mm","600 mm","900 mm","1200 mm"
          ]}
        />

        <Dropdown
          scrollID="tip"
          change={this.props.changeType}
          value={this.props.type}
          title="Tip folije"
          values={[
            "RA1","RA2","RA3"
          ]}
        />

       
      </React.Fragment>
    )
  }
}

export default BasicMode
