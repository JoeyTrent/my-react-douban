import React from 'react'


export default class MovieItem extends React.Component {
     constructor(props) {
         super(props)
         this.state = {}
     }

     render(){
         return( <div >
            <img src={this.props.images.small}  referrerPolicy="no-referrer" alt=""/>
            <h4>电影名称：{this.props.title}</h4>
            <h4>上映年份：{this.props.year}</h4>
            <h4>电影类型：{this.props.genres.join(',')}</h4>
           </div>)
     }
}