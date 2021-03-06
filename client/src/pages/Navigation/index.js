import React, {useEffect, useState} from 'react'
import { PageArea } from './styled';
import {useHistory, useLocation, Link} from 'react-router-dom'
import { PageContainer } from '../../components/MainComponents';
import useApi from '../../helpers/BookAPI';

import Seta from './img/Seta.png'
import import_contacts from './img/import_contacts.png'
import event_note from './img/event_note.png'
import Vector from './img/Vector.jpg'

const Page = () => {

    const api = useApi()
    
    const [Search, setSearch] = useState(undefined)
    const [filter, setfilter] = useState(undefined)
    const [typeFilter, settypeFilter] = useState(undefined)
    const [json, setJson] = useState([])

    const history = useHistory()
    const {search} = useLocation()

    useEffect(() => {
        async function getdata(){
            const params = new URLSearchParams(search)
            
            if( params.get('search') == null || params.get('search') == 'undefined'){
                const data = await api.notitle(search).catch((error) => [])
                
                setJson(data)
                
            }
            else{
                const data = await api.withtitle(search).catch((error) => [])
                setJson(data)
                
            }  
        }
        getdata()
    },[api, search])


    const handleFilters = (e)=>{
        e.preventDefault()
        let query_send = '?'
        let filter_obj = {
            search: Search,
            typeFilter:typeFilter,
            filter: filter,
        }
        let obj_prop = Object.getOwnPropertyNames(filter_obj)

        for(let i in obj_prop){
            query_send += obj_prop[i] + '=' +filter_obj[obj_prop[i]] + '&&'
        }
        if(window.location.pathname+search == '/navigation/' + query_send){
            window.location.reload()
        }
        history.push( '/navigation/' + query_send)

    }

    return(
        <PageContainer>
            <PageArea>
            <form onSubmit={handleFilters}>
            <h1 className='title'>Encontre seu pr??ximo livro!</h1>
            <div className='search-bar'>
                <input type='text' name="search-bar" onChange={event =>{setSearch(event.target.value)}}></input>
            </div>
            <div className='search-options'>
                <label className='label'>
                    <input  className='input' id='genero' type="radio" name="filter-type" value='1' onClick={event => {settypeFilter(event.target.value)}}/>
                    <label className='cor'>G??nero</label>
                    <span></span>
                </label>
                <label className='label'>
                    <input className='input' id='autor' type="radio" name="filter-type" value='2' onChange={event => {settypeFilter(event.target.value)}}/>
                    <label className='cor'>Autor</label>
                    <span></span>
                </label>
                
                

                {typeFilter == 2 && <>
                    <select className='dropdown' onChange={event =>{setfilter(event.target.value)}} defaultValue={'DEFAULT'}>
                        <option value='DEFAULT' disabled className='dontshow'>Autores</option>
                        <option value="" ></option>
                        <option value="Neil Gaiman">Neil Gaiman</option>
                        <option value="W. Timothy">W. Timothy</option>
                        <option value="Tim Harford">Tim Harford</option>
                        <option value="Benjamin Moser">Benjamin Moser</option>
                        <option value="Gil do Vigor">Gil do Vigor</option>
                        <option value="Dani Atkins">Dani Atkins</option>
                        <option value="Victoria Aveyard">Victoria Aveyard</option>
                        <option value="Guillherme del Toro e Cornelia Funke">Guillherme del Toro e Cornelia Funke</option>
                        <option value="David Levithan">David Levithan</option>
                        <option value="Wendy Leigh">Wendy Leigh</option>
                    </select>
                </>}
                {typeFilter == 1 && <>
                    <select className='dropdown' onChange={event =>{setfilter(event.target.value)}} defaultValue={'DEFAULT'}>
                        <option value='DEFAULT' disabled className='dontshow'>G??neros</option>
                        <option value="" ></option>
                        <option value="fantasia">fantasia</option>
                        <option value="Auto-ajuda">Auto-ajuda</option>
                        <option value="Biografia">Biografia</option>
                        <option value="Romance">Romance</option>
                    </select>
                </>}
                {typeFilter === undefined && <>
                    <select className='dropdown' onChange={event =>{setfilter(event.target.value)}} defaultValue={'DEFAULT'}>
                        <option value='DEFAULT' disabled className='dontshow'>Selecione Autor ou G??nero</option>
                    </select>
                </>} 
                <input className = 'vector'type="image" src={Vector} name="submit" alt="submit"/>
            </div>
            </form>
            <div className='books'>
               {json.length == [] &&
               <>
               </>}
               { json !== [] &&
               <>
               {json.map((json, key) => {
                   return (
                    <div className='book' key={key}>
                        <img className = 'cover' src={json.image} alt={'Capa do livro: ' + json.title} />
                        <div className='title'>
                            {json.title}
                        </div>
                        <div className='info'>
                            <h3>{json['Author.name']}</h3>
                            <h2>{json['Genres.name']}</h2>
                        </div>
                        <div className='leitura'>
                            <img className ='img_template' src ={event_note} alt="Calend??rio" />
                            <h4>{json.time_to_read} dias</h4>
                            
                        </div>
                        <div className='leitura'>
                            <img className ='img_template' src ={import_contacts} alt="Calend??rio" />
                            <h4>{json.pageNumber} p??ginas</h4>
                        </div>
                        <div className='button'>
                            <Link className='arrow'to={'/Detalhes/'+json.id} ><img className='arrow' src ={Seta} alt="Calend??rio" /></Link>
                        </div>
                        
                    </div>
                   )
               })}
               
               </>}
            </div>

        </PageArea>
        </PageContainer>
        
        
    )
}

export default Page