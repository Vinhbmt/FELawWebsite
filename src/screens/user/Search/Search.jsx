import React, {useEffect, useState} from 'react';
import './Search.scss';
import Container from '../../../components/container/Container';
import {useSelector} from "react-redux";
import SmallCard from '../../../components/cards/SmallCard';
import SearchMusic from "./searchMusic.svg";
import SearchMusicMp3 from "./searchMusicMp3.svg";
import SearchMusicDisc from "./searchMusicDisc.svg";
import ArrowUp from './left.svg';
import lawyers from '../../../data';

const Search = () => {
    const { search} = useSelector(state => state.lawyerReducer);
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        setSearchResult(lawyers.filter((i) => (
            (i.name.toLowerCase().startsWith(search))
        )));
    }, [search, lawyers]);
    return (
        <Container>
            {
                (search === "" || search === null)
                    ?
                    <div className={"Search"}>
                        <div className="Search-img">
                            <img className={"Rotate-img"} src={SearchMusicDisc} alt="search-music-icon"/>
                            <img src={SearchMusicMp3} alt="search-music-icon"/>
                            <img src={SearchMusic} alt="search-music-icon"/>
                            <img className={"Arrow"} src={ArrowUp} alt=""/>
                        </div>
                    </div>
                    :
                    <div className={"Search-result"}>
                        {
                            searchResult.length === 0
                                ?
                                <div className={"Search-fallback"}>
                                    No result found.
                                </div>
                                :
                                searchResult.map((item) => (
                                    <SmallCard key={item.id} lawyer={item}/>
                                ))
                        }
                    </div>
            }
        </Container>
    );
}

export default Search;