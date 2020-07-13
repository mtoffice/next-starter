import Dropdown from "./Dropdown"



class AdvanceMode extends React.Component {

  render(){
    return(
      <React.Fragment>

        <Dropdown
          scrollID="postavitve"
          change={this.props.changeCestaPostavitve}
          value={this.props.cestaPostavitve}
          title="Cesta postavitve"
          values={[
            "Avtoceste / hitra cesta","Cesta zunaj naselja","Cesta v naselju"
          ]}
        />

        <Dropdown
          scrollID="okolice"
          change={this.props.changeOsvetlitevOkolice}
          value={this.props.osvetlitevOkolice}
          title="Osvetlitev okolice"
          values={[
            "Normalno/naravno osvetljena okolica","Osvetljena okolica in/ali več zunanjih virov svetlobe"
          ]}
        />

        <Dropdown
          scrollID="mesto"
          change={this.props.changeMestoPostavitve}
          value={this.props.mestoPostavitve}
          title="Mesto Postavitve"
          values={[
            "Na desni strani vozišča/cestišča","Nad voziščem/cestiščem ali na njegovi levi strani"
          ]}
        />

        <Dropdown
          scrollID="hitrost"
          change={this.props.changeDovoljenaHitrost}
          value={this.props.dovoljenaHitrost}
          title="Dovoljena Hitrost"
          values={[
            "Nad 90 km/h","Med vključno 50 km/h in 90 km/h","50 km/h in manj","Površine za pešče in kolesarje, parkirne površine"
          ]}
        />


      </React.Fragment>
    )
  }
}




export default AdvanceMode
