import React from 'react'

import { Button, Icon, Spin ,Alert,  } from 'antd'

import fetchJSONP from 'fetch-jsonp'
import { changeConfirmLocale } from 'antd/lib/modal/locale'

export default class MovieDetail extends React.Component {
     constructor(props) {
         super(props)
         this.state = {
             info: {},
             isloading: true
         }
     }
// https://api.douban.com/v2/movie/subject/25779217?apikey=0df993c66c0c636e29ecbb5344252a4a
     componentWillMount(){
        fetchJSONP('https://api.douban.com/v2/movie/subject/'+this.props.match.params.id+'?apikey=0df993c66c0c636e29ecbb5344252a4a')
         .then(res => res.json())
         .then(data => {
            this.setState({
                info: data,
                isloading: false
            })
         })
     }
     render(){
         return(<div>
             <Button type="primary" onClick = {this.goBack}>
               <Icon type="left" />
                 返回电影列表页面
             </Button>
             {this.renderInfo()}
         </div>)
     }

     goBack = () => {
         this.props.history.go(-1)
     }

     renderInfo = () => {
         if(this.state.isloading){
             return(
            <Spin tip="Loading...">
            <Alert message="正在请求电影详情 ：)" description="马上就来 :o)" type="info"/> </Spin>)
         }else{
            return(
                <div style = {{ textAlign: 'center'}}>
                   <h1>{this.state.info.title}</h1>
                   <img src={this.state.info.images.large.replace('img3','img1')}/>
                   <p style={{ textIndent: '2em', lineHeight: '30px'}}>{this.state.info.summary}</p>
                </div>)
         }
     }
}

