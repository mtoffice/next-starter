import styled from 'styled-components'
import { withRouter } from 'next/router'
import Header from '../components/layout/CartHeader'
import Scroll from 'react-scroll';


var Element = Scroll.Element;
var scroller = Scroll.scroller;


class pogojiUporabe extends React.Component {
  state = {
    website: "www.signaco.si",
    address: "Topole 51a, 1234 Mengeš",
    linkToCookies: "https://signaco.si/assets/cookiePolicy.pdf",
    company1: "signaco d.o.o.",
    company2: "signaco",
    company3: "Signaco",
    email: "info@signaco.si",
    date: "1.6.2018",
    service: "proizvodnjo prometnih in neprometnih znakov",
    service2: "proizvajanja prometnih in neprometnih znakov",
  }; 


  render() {
   

    return (
      <React.Fragment>
        <Header />
        <Wrapper>
          <Button onClick={()=>this.props.router.back()}>
            Nazaj
          </Button>
          <TitleH1>
            Pogoji uporabe
          </TitleH1>
          <Flex>
            <Body>
                <Element name="1. Področje uporabe"/>
                <Subtitle>
                  1. Področje uporabe
                </Subtitle>
                <Text>
                  Ti splošni pogoji uporabe in politika varstva osebnih podatkov se nanašajo na vse uporabnike in vse oblike uporabe spletne strani {this.state.website}, ki je v lasti {this.state.company1} ter določajo pogoje njene uporabe ter politiko varstva osebnih podatkov, ki ji sledimo. Uporabljeni pojmi:<li>1. "splošni pogoji" pomenijo te Splošne pogoje uporabe in politiko varstva osebnih podatkov;</li><li>2. "spletna stran" pomeni spletno stran, spletne dejavnosti in ostale spletne oziroma digitalne storitve oziroma aplikacije {this.state.company2} {this.state.website};</li><li>3. "uporabnik" predstavlja vsakega uporabnika oziroma obiskovalca spletne strani,</li><li>4. "{this.state.company2}" ali "{this.state.company3}" pomeni {this.state.company1}, {this.state.address}.</li>
                </Text>
                <Element name="2. Seznanjenost s splošnimi pogoji"/>
                <Subtitle>
                  2. Seznanjenost s splošnimi pogoji
                </Subtitle>
                <Text>
                  Uporabnik potrjuje, da je z vstopom na spletno stran izvajalca skrbno prebral te Splošne pogoje uporabe spletne strani in da se z njimi strinja ter da jih sprejema v celoti. Če s pogoji uporabe ne soglašate, priporočamo, da te spletne strani ne uporabljate in jo zapustite.
                </Text>
                <Element name="3. Uporaba spletne strani"/>
                <Subtitle>
                  3. Uporaba spletne strani
                </Subtitle>
                <Text>
                  Podatki objavljeni na spletni strani in vsebine so namenjeni izključno informativni naravi. Z objavami in na podlagi objav za {this.state.company2} ne nastanejo nikakršne pravice ali obveznosti, razen če je to izrecno navedeno. Uporaba spletne strani je na lastno odgovornost.
                </Text>
                <Text>
                  Ves čas si prizadevamo za točnost in pravilnost podatkov, objavljenih na spletni strani. Za morebitne jezikovne ali vsebinske pomanjkljivosti, točnost informacij, tehnične ali druge napake ali za pomanjkljivo ažurirane podatke na spletni strani, ne odgovorajamo. Če na spletni strani obstajajo povezave na druge spletne strani, ki niso v nikakršni povezavi z {this.state.company2}, ne prevzemamo nobene odgovornosti za obliko in vsebino podatkov, pridobljenih prek povezav, ki niso last izvajalca ter za politike varovanja podatkov in pravil uporabe teh strani. {this.state.company3} ne jamči, da bodo spletna stran ali njene podstrani (vključno z vsemi vsebinami) vedno na voljo, da bo uporaba spletne strani varna in neprekinjena. {this.state.company3} ni odgovorno za mrežne in telefonske povezave, vključno s pokritostjo območja ali prekinitvijo zveze, kot tudi ne za kakršno koli škodo, ki bi nastala zaradi uporabe spletne strani, kot so izgubljeni podatki, izguba programov ali za kakršno koli podobno škodo oziroma za škodo, ki bi izhajala iz uporabe, obstoja ali nemožnosti uporabe spletne strani ali vsebin objavljanih na spletni strani.
                </Text>
                <Text>
                  {this.state.company3} ne odgovarja za zlorabe tretjih oseb oziroma uporabnikov.
                </Text>
                <Element name="4. Avtorske pravice"/>
                <Subtitle>
                  4. Avtorske pravice
                </Subtitle>
                <Text>
                  Vse materialne in moralne avtorske pravice vseh avtorskih del objavljenih na spletni strani pripadajo {this.state.company2}. Avtorska dela so: prispevki, besedila, fotografije, razporeditve, design, video, glasba, ilustracije, grafični elementi, znaki in znamke in podobno). Imetniki avtorske pravice na avtorskih delih objavljenih na spletni strani so lahko tudi zaposleni v {this.state.company2}, partnerji, pogodbeni sodelavci ali tretje osebe, kar je ustrezno označeno. 
                </Text>
                <Text>
                  {this.state.company3} dovoljuje, da se vsebina spletne strani, kjer so avtorska dela, le prebira in pregleduje. {this.state.company3} prepoveduje uporabo avtorskih del podjetja v vseh oblikah (na primer: spreminjanje, javno prikazovanje, predvajanje, reprodukcijo), kakor tudi uporabo podatkov navedenih v teh delih, brez predhodno pridobljenega dovoljenja {this.state.company2}. Kadar je podano dovoljenje mora uporabnik jasno označiti, da gre za avtorsko delo {this.state.company1} in navesti vir pridobitve.
                </Text>
                <Element name="5. Politika varstva osebnih podatkov"/>
                <Subtitle>
                  5. Politika varstva osebnih podatkov
                </Subtitle>
                <Element name="5.1. Splošno"/>
                <Subtitle>
                  5.1. Splošno
                </Subtitle>
                <Text>
                  Ob obisku spletne strani {this.state.website} ter njenih podstrani se na spletnem strežniku avtomatsko shranjuje dnevniška datoteka spletnega strežnika (npr. IP-številka - številka, ki identificira posamezni računalnik oziroma drugo napravo, povezano s spletom; različica brskalnika, čas obiska in podobno). Podrobneje je politika piškotkov opisana v Politiki piškotkov objavljeni tukaj. Te podatke obdelujemo za potrebe vodenja svoje statistike obiskov na spletni strani.
                </Text>
                <Text>
                  Osebni podatki na spletni strani se zbirajo izključno za namene določene v teh Splošnih Pogojih in <a href={this.state.linkToCookies}>Politiki Piškotkov</a>, za katere se strinjate, da ste jih prebrali. Varovanje osebnih podatkov se zagotavlja skladno z zakonom, ki ureja varstvo osebnih podatkov, zakonom, ki ureja elektronske komunikacije in Splošno uredbo o varstvu osebnih podatkov (GDPR).
                </Text>
                <Text>
                  Vse osebne podatke, ki jih posredujete, bo {this.state.company3} obravnavala zaupno in jih uporabila zgolj v namene, za katere ste jih posredovali. Če bo nastala potreba po nadaljnji obdelavi vaših podatkov za kak drug namen, vas bomo o tem predhodno obvestili in vas zaprosili za vaše soglasje.
                </Text>
                <Text>
                  Če na spletni strani obstajajo povezave na druge spletne strani, ki niso v nikakršni povezavi z {this.state.company2}, ne prevzemamo nobene odgovornosti za zaščito vaših osebnih podatkov na teh spletnih straneh.
                </Text>
                <Text>
                  Za pravilnost in točnost osebnih podatkov, ki jih preko spletne strani {this.state.website} pošljte {this.state.company2} ste odgovorni izključno sami in nam jih posredujete prostovoljno in na podlagi privolitve.
                </Text>
                <Text>
                  Posredovanje osebnih podatkov ni pogoj za uporabo spletne strani {this.state.website}.
                </Text>
                <Element name="5.2. E-novice"/>
                <Subtitle>
                  5.2. E-novice
                </Subtitle>
                <Text>
                  V {this.state.company2} se trudimo uporabnikom podati aktualne informacije iz različnih področij, povezanih s {this.state.service} preko objav novic, člankov, mnenj, priporočil, informacij. Te informacije so zgolj informativne narave in so za {this.state.company2} nezavezujoče.
                </Text>
                <Text>
                  Na naši spletni strani ali z izpolnitvijo fizičnih obrazcev se lahko naročite na prejemanje novic ter informacij iz različnih področij, ki vas utegnejo zanimati in s katerimi se ukvarja {this.state.company2} ter na obvestila o izobraževanjih in delavnicah, na katerih sodelujejo sodelavci {this.state.company2}, novice o {this.state.company2} ali drugih pomembnih dogodkih povezanih s področjem spletnega razvoja in oblikovanja, in sicer tako, da nam posredujete ime in priimek ter e- naslov. V primeru prijave vas lahko {this.state.company2} prek tega e-naslova obvešča o novostih na področju {this.state.service2}, novicah, publikacijah, predavanjih in izobraževanjih, ter vam posreduje druge informacije s področja {this.state.service2}, ki so aktualna in so del delovanja {this.state.company2}.
                </Text>
                <Text>
                  Navedeni osebni podatki se obdelujejo na osnovi vašega soglasja, pri čemer lahko soglasje za prejemanje oglasnih sporočil kadar koli prekličete.
                </Text>
                <Element name="5.3. Piškotki"/>
                <Subtitle>
                  5.3. Piškotki
                </Subtitle>
                <Text>
                  Spletna stran {this.state.website} uporablja piškotke, kar je opredeljeno v Politiki Piškotkov. Svetujemo, da se s Politiko piškotkov seznanite.
                </Text>
                <Element name="5.4. Uporabniki podatkov"/>
                <Subtitle>
                  5.4. Uporabniki podatkov
                </Subtitle>
                <Text>
                  {this.state.company3} bo podatke primarno uporabljala za namene opredeljene v teh Splošnih pogojih. Zavezujemo pa se, da pridobljenih osebnih podatkov ne bomo posredovali tretjim osebam. Vendar pa {this.state.company2} lahko zbrane podatke posreduje pogodbenim obdelovalcem z namenom zagotavljanja nekaterih storitev (na primer: administratorju in skrbniku spletne strani). Zavezujemo se, da vaših osebnih podatkov ne bomo posredovali ali prenesli v tretjo državo ali kakšni mednarodni organizaciji.
                </Text>
                <Element name="5.5. Čas hrambe"/>
                <Subtitle>
                  5.5. Čas hrambe
                </Subtitle>
                <Text>
                  Vaše osebne podatke hranimo toliko časa, kolikor je potrebno, da se izpolni namen za katerega so bili zbrani in uporabljeni, in sicer se vaši kontaktni podatki za potrebe prejemanja e-novic hranijo do preklica. Čas hrambe za podatke pridobljene preko piškotkov in njihove uporabnike pa je razvidno iz <a href={this.state.linkToCookies}>Politiki Piškotkov</a>.
                </Text>
                <Text>
                  Po izteku časa in skladno s tehničnimi možnostmi se osebni podatki izbrišejo.
                </Text>
                <Element name="5.6. Pravice uporabnika"/>
                <Subtitle>
                  5.6. Pravice uporabnika
                </Subtitle>
                <Text>
                  {this.state.company2} zagotavlja uresničevanje vseh pravic uporabnikov v zvezi z varstvom osebnih podatkov skladno z veljavnimi predpisi.
                </Text>
                <Text>
                  Od {this.state.company2} lahko kadar koli zahtevate:
                    <li>- podatek o tem, ali se v zvezi z vami obdelujejo osebni podatki;</li>
                    <li>- dostop do osebnih podatkov (vpogled in/ali prepis);</li>
                    <li>- informacije v zvezi z obdelavo teh podatkov (namen obdelave, vrsta podatkov, uporabnikih podatkov, času hrambe);</li>
                    <li>- kopijo osebnih podatkov;</li>
                    <li>- popravek netočnih osebnih podatkov in dopolnitev nepopolnih osebnih podatkov;</li>
                    <li>- izbris vseh osebnih podatkov ("pravica do pozabe");</li>
                    <li>- omejitev obdelave osebnih podatkov;</li>
                    <li>- prenos podatkov;</li>
                    <li>- preklic privolitve.</li>

                </Text>
                <Text>
                  Vaše pravice se izvajajo skladno z vsakokratno veljavnimi predpisi.
                </Text>
                <Element name="6. Sprememba pogojev in kršenje pogojev"/>
                <Subtitle>
                  6. Sprememba pogojev in kršenje pogojev
                </Subtitle>
                <Text>
                  Splošni pogoji se lahko spreminjajo brez izrecnega predhodnega opozorila, zato uporabnikom svetujemo, da so na morebitne spremembe pozorni, da bodo seznanjeni in obveščeni o veljavnih pogojih uporabe spletne strani ter podatki o varovanju zasebnosti. Za kakršne koli posledice sprememb Splošnih pogojev {this.state.company2} ne prevzema nobene odgovornosti. Na spletnih straneh bodo objavljeni vsakokratno veljavni splošni pogoji, sprejeti skladno z vsakokratno veljavnimi predpisi. Zadnja veljavna verzija splošnih pogojev je označena z navedbo datuma, od kdaj splošni pogoji veljajo na koncu dokumenta.
                </Text>
                <Element name="7. Kontakt in prijava kršitev"/>
                <Subtitle>
                  7. Kontakt in prijava kršitev
                </Subtitle>
                <Text>
                  Za vse pripombe, vprašanja, pritožbe, kršitve ali uporabniške izkušnje povezane s spletno stranjo lahko naslovite na nas preko e-naslova: {this.state.email} ali po pošti na naslov {this.state.company1}, od {this.state.address}.
                </Text>
                <Element name="8. Reševanje sporov in uporaba prava"/>
                <Subtitle>
                  8. Reševanje sporov in uporaba prava
                </Subtitle>
                <Text>
                  Za spore, ki bi izvirali iz uporabe te spletne strani ali e-novic, se bomo trudili, da se predmetni spori čim prej rešijo sporazumno. V kolikor to ne o mogoče je pristojno sodišče v Ljubljani. Uporablja se pravo Republike Slovenije.
                </Text>
                <Element name="9. Veljavnost splošnih pogojev"/>
                <Subtitle>
                  9. Veljavnost splošnih pogojev
                </Subtitle>
                <Text>
                  Ti splošni pogoji se uporabljajo od dneva sprejema in objave dalje do njihovega preklica oziroma do morebitne spremembe.
                </Text>
                <Text>
                  Splošni pogoji veljajo od dne {this.state.date}.
                </Text>
                <Text>
                  {this.state.company1}
                </Text>
            </Body>
            <Stickey>
              <Stickey2>
                <Nav>
                  <MenuItem
                    onClick={()=>{
                      scroller.scrollTo('1. Področje uporabe', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}
                  >
                    1. Področje uporabe
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('2. Seznanjenost s splošnimi pogoji', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    2. Seznanjenost s splošnimi pogoji
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('3. Uporaba spletne strani', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    3. Uporaba spletne strani
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('4. Avtorske pravice', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    4. Avtorske pravice
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('5. Politika varstva osebnih podatkov', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    5. Politika varstva osebnih podatkov
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('5.1. Splošno', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    5.1. Splošno
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('5.2. E-novice', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    5.2. E-novice
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('5.3. Piškotki', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    5.3. Piškotki
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('5.4. Uporabniki podatkov', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    5.4. Uporabniki podatkov
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('5.5. Čas hrambe', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    5.5. Čas hrambe
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('5.6. Pravice uporabnika', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    5.6. Pravice uporabnika
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('6. Sprememba pogojev in kršenje pogojev', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    6. Sprememba pogojev in kršenje pogojev
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('7. Kontakt in prijava kršitev', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    7. Kontakt in prijava kršitev
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('8. Reševanje sporov in uporaba prava', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    8. Reševanje sporov in uporaba prava
                  </MenuItem>
                  <MenuItem onClick={()=>{
                      scroller.scrollTo('9. Veljavnost splošnih pogojev', {
                        duration: 600,
                        delay: 0,
                        smooth: true,
                        offset: 0, 
                      })
                    }}>
                    9. Veljavnost splošnih pogojev
                  </MenuItem>
                </Nav>
              </Stickey2>
            </Stickey>
          </Flex>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export const Stickey = styled.div(props => ({
  position: "-webkit-sticky",
  top: 40,
}));

export const Stickey2 = styled.div(props => ({
  position:"sticky",
  top: 40,
}));

export const Wrapper = styled.div(props => ({
   width:"calc(100% - 60px)",
   margin:"0 auto",
   maxWidth:1200,
   minWidth:500,
}));
export const Flex = styled.div(props => ({
  borderTop:"#C4C4C4 solid 1px",
  paddingBottom:60,
  display:"flex",
  justifyContent:"center",
}));

export const Body = styled.div(props => ({
   
}));
export const Nav = styled.div(props => ({
   minWidth:280,
   marginLeft:100,
   marginTop:40,
}));
export const Subtitle = styled.h2(props => ({
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "14px",
  lineHeight: "23px",
  paddingTop:24,
  marginBottom:8,
  color:"#4CAF50",
}));
export const MenuItem = styled.h2(props => ({
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "14px",
  lineHeight: "23px",
  marginBottom:8,
  cursor:"pointer",
  userSelect:"none",
  color:"#4CAF50",
}));
export const Text = styled.p(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "23px",
  marginTop:0,
}));




export const TitleH1 = styled.h1(props => ({
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "22px",
  paddingTop:60,
}));

export const Button = styled.a(props => ({
  transition: "0.3s ease-in-out",
  overflow:"hidden",
  width:200,
  display:"block",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  marginBottom:0,
  marginTop:48,
  textDecoration:"underline",
  color:"#4CAF50",
}));



export default withRouter(pogojiUporabe)
