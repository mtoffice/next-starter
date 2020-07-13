import styled from 'styled-components'
import {withRouter} from 'next/router'
import Dropdown from "./Dropdown"
import Counter from "./Counter"
import Specifications from "./Specifications"
import Complementary from "./Complementary"
import Submit from "./Submit"
import Attachment from "./Attachment"
import TextArea from "./TextArea"



class ClassMode extends React.Component {

  render(){
    var productClass = this.props.productClass;
    return(
      <React.Fragment>
        {(productClass==2 || productClass==5) &&
          <React.Fragment>
            <TextArea 
              changeText={this.props.changeText} 
              text={this.props.text}
              placeholder="Vsebina znaka"
            />
            <Attachment
              file={this.props.file}
              files={this.props.files}
              fromCart={this.props.fromCart}
              accepted={this.props.accepted}
              acceptedFiles={this.props.acceptedFiles}
              deleteFiles={this.props.deleteFiles}
            />
          </React.Fragment>
        }


        {(productClass==1) &&
          <React.Fragment>
            <Title>Dopolnilne table</Title>
            <Complementary
              dopolnilnaClicked={this.props.dopolnilnaClicked}
              complementary={this.props.complementary}
              changeComplementaryText={this.props.changeComplementaryText}
              textComplementary={this.props.textComplementary}
            />
          </React.Fragment>
        }

        {(productClass==1 || productClass==2 || productClass==5) &&
          <React.Fragment>
            <Title>Nosilna konstrukcija (drog)</Title>
            <Dropdown
              scrollID="Dolžina"
              change={this.props.changeBarLength}
              value={this.props.barLength}
              title="Dolžina"
              values={[
                "1000mm","1500mm","2000mm","2500mm","3000mm","3500mm","4000mm","4500mm","5000mm","5500mm","6000mm","6500mm","7000mm"
              ]}
            />
            <Dropdown
              scrollID="Premer-drog"
              change={this.props.changeBarDiameter}
              value={this.props.barDiameter}
              title="Premer"
              values={[
                "52,5mm","60mm","63,5mm","76mm","88,9mm","76mm","101,6mm"
              ]}
            />

            <Title>Pritrdilni material (objemke)</Title>
            <Dropdown
              scrollID="Premer-objemka"
              change={this.props.changeClamp}
              value={this.props.clamp}
              title="Premer"
              values={[
                "52,5mm","60mm","63,5mm","76mm","88,9mm","76mm","101,6mm"
              ]}
            />
          </React.Fragment>
        }

        
        <Specifications 
          {...this.props}
        />

        
        <SelectWrapper>
          <Counter
            changeCount={this.props.changeCount}
            countMinus={this.props.countMinus}
            countPlus={this.props.countPlus}
            counter={this.props.number}
          />
          <Submit
            {...this.props}
          />
        </SelectWrapper>

      </React.Fragment>
    )
  }
}



export const SelectWrapper = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginTop:24,
  marginBottom:48,
}));

export const Title = styled.h3(props => ({
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "17px",
  marginBottom:20,
  marginTop:32,
}));


export default withRouter(ClassMode)
