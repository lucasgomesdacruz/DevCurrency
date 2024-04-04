import { useEffect, useState } from 'react';
import styles from './home.module.css'
import { BiSearch } from "react-icons/bi";
import { Link } from 'react-router-dom';

//https://coinlib.io/api/v1/coinlist?key=68ce7174040eb4cf&pref=BTC&page=1&order=volume_desc
// 68ce7174040eb4cf

interface CoinProps {
    name: string;
    delta_24H: string;
    price: string;
    symbol: string;
    volume: string;
    market_cap: string;
    formatedPrice: string;
    formatedMarket: string;
}

interface DataProps {
    coins: CoinProps[];
}

export function Home() {
    const [coins, setCoins] = useState<CoinProps[]>([])

    useEffect(() => {
        function getData() {
            fetch('https://sujeitoprogramador.com/api-cripto/?key=68ce7174040eb4cf')
            .then(response => response.json())
            .then((data: DataProps) => {
                let coinsData = data.coins.slice(0, 15);

                let price = Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })

                const formatResult = coinsData.map((item) => {
                    const formated = {
                        ...item,
                        formatedPrice: price.format(Number(item.price)),
                        formatedMarket: price.format(Number(item.market_cap)),

                    }
                    return formated;
                })
                
                setCoins(formatResult);
            })
        }


        getData()
    }, []) 
    return(
        <main className={styles.container}>
            <form className={styles.form}>
                <input  
                    placeholder='Digite o simbolo da moeda: BTC..'

                />
                <button type='submit'>
                    <BiSearch size={30} color="#FFF"/>
                </button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor Mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                    <tr className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda">
                            <Link className={styles.link} to="/details/btc">
                                <span>Bitcoin</span> | BTC
                            </Link>
                        </td>
                        <td className={styles.tdlabel} data-label="Mercado">
                            R$ 19229
                        </td>
                        <td className={styles.tdlabel} data-label="Preço">
                            R$ 40.6666
                        </td>   
                        <td className={styles.tdLoss} data-label="Volume">
                            <span>-5.3</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}