import React from 'react'

//导入样式表
import styles from '../../css/movie_item.scss'

//评分组件 antd
import { Rate } from 'antd'


export default class MovieItem extends React.Component {
     constructor(props) {
         super(props)
         this.state = {}
     }

     render(){
         return( <div className={styles.box} onClick ={this.goDetail} >
            <img src={this.props.images.small}  referrerPolicy="no-referrer" className={styles.img} alt=""/>
            <div className={styles.detail}>
            <h4>电影名称：{this.props.title}</h4>
            <h4>上映年份：{this.props.year}年</h4>
            <h4>电影类型：{this.props.genres.join(',')}</h4>
            <Rate disabled defaultValue={this.props.rating.average/2} />
            </div>
           </div>)
     }

     //go详情
     goDetail = () => {
         this.props.history.push('/movie/detail/'+ this.props.id)
     }
}