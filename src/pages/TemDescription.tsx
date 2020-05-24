import React, {Component} from 'react';
import Titulo from '../components/Titulo'
import { getTemsTyipos } from '../services/getTem'



import axios from 'axios'

interface Props {
    match: any
}

interface State {
    temId: any,
    user: any,
    typeImg: any,
    temTipyImg: any,
    baseUrl: any,
    tiposDeMap: any
}
class TemDescription extends Component<Props, State>  {

    constructor (props: any) {
        super(props)
        this.state = {
            temId: {},
            user: {},
            typeImg: {},
            temTipyImg: [],
            baseUrl: '',
            tiposDeMap: {}
        }
    }
    

     async componentDidMount(){
        const { match: { params } } = this.props
        const baseUrl = 'https://temtem-api.mael.tech'

        const responseJson = await getTemsTyipos()
            let {tiposDeMap} = this.state
             tiposDeMap = responseJson.reduce(function(itemName: any, img:any ) {
                let key = img.name
                
                let esxisteTipo = key in itemName
                
                
                if(!esxisteTipo){
                    itemName[key] = img
                    
                }
                return itemName
            }, {})

        axios.get(`${baseUrl}/api/temtems/${params.temId}`)
        .then(({ data: user}) =>{
            
            this.setState({
                user
            })
            this.mesclarTypo()
        })

            this.setState({
                tiposDeMap,
                baseUrl
                
            })
           
            

    }

    mesclarTypo(){
        let { temTipyImg, user, tiposDeMap } = this.state
            temTipyImg = user.types.map(function(tipos:any) {
                let imagenIcono =  tiposDeMap[tipos].icon 
                return {tipo :tipos, imagenTipo: imagenIcono}
            })
        this.setState({
            temTipyImg
        })
        console.log("resultado final",temTipyImg)
    }
	render() {
        const { user, temTipyImg, baseUrl } = this.state
        return(
            <>
            <Titulo>{user.name}</Titulo>
            <img src={user.wikiPortraitUrlLarge} alt=""/>
            <div>
            {
                
            temTipyImg.map((tipos:any, key: any) => 
            <div key={key}>
            <img src={`${baseUrl}${tipos.imagenTipo}`} alt=""/>
            <div>{tipos.tipo}</div>
            </div>)
            }
             
            </div>
   
            </>
        )
    }
}


export default TemDescription