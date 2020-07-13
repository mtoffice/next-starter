import styled from 'styled-components'

const InfoBox = ({ children }) => (
  <Info>
    {children}
  </Info>
)

const Info = styled.div(props => ({
  marginTop: "20px",
  marginBottom: "20px",
  paddingTop: "20px",
  paddingBottom: "20px",
  borderTop: "1px solid #ececec",
  borderBottom: "1px solid #ececec",
}));

export default InfoBox
