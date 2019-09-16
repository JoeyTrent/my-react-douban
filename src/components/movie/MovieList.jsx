import React from 'react'

//导入 antd 组件
import { Spin, Alert, Pagination } from 'antd'

//导入电影项组件
import MovieItem from './MovieItem.jsx'

//导入fetch-jsonp 
import fetchJSONP from 'fetch-jsonp'


export default class MovieList extends React.Component {
     constructor(props) {
         super(props)
         this.state = {
             movie: [],
             nowPage: parseInt(props.match.params.page)|| 1,
             pageSize: 12 ,   //每页数量
             total: 0, // 分类的总数量
             movieType: props.match.params.type,
             isloading: true //true 正在获取数据
         }
     }

     componentWillMount(){
         this.LoadMovieListByTypePage()
     }

     componentWillReceiveProps(nextProps){
        //console.log(nextProps.match.params.type)
        this.setState({
            isloading: true,
            nowPage: parseInt(nextProps.match.params.page)|| 1,
            movieType: nextProps.match.params.type,
        }, function () {
            this.LoadMovieListByTypePage()
        })
     }
     render(){
         return(<div>
             {this.renderList()}
         </div>
         )
     }
     
     //加载 数据   利用 fetch-jsonp 
     LoadMovieListByTypePage = () =>{
       //  console.log(this.state.nowPage)
        const start = this.state.pageSize*(this.state.nowPage-1)
        const url = `https://api.douban.com/v2/movie/${this.state.movieType}?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${this.state.pageSize}`
    //    console.log(url)
        fetchJSONP(url)
         .then(reponse => reponse.json())
         .then(data => {
             console.log(data)
            this.setState({
                isloading: false,
                movies: data.subjects,
                total: data.total
            })
         })

        //静态数据
    //     const data = require('../test_data/'+this.state.movieType+'.json')
    //    // console.log(data)
    //     setTimeout(() => {
    //         this.setState({
    //             isloading: false,
    //             movies: data.subjects,
    //             total: data.total
    //         })
    //     }, 300)
       
     }
     //渲染电影列表 
     renderList = () => {
        if(this.state.isloading){ //正在加载
            return (
                <Spin tip="Loading...">
                   <Alert message="正在请求电影列表 ：)"  description="马上就来 :o)" type="info"/>
                </Spin>
            )
        }else{
            return (<div><div style={{display:'flex',flexWrap:'wrap'}}>
                {
                    this.state.movies.map(item => {
                    return (<MovieItem {...item} history = {this.props.history} key={item.id}></MovieItem>)
                  })
                }
            </div>
            <Pagination defaultCurrent={this.state.nowPage} pageSize = {this.state.pageSize} total={this.state.total} onChange = {this.pageChanged} />
            </div>)
        }
     }

     pageChanged = (page) => {
        //  console.log('ok')
        // window.location.href = '/#/movie/' + this.state.movieType + '/' + page
        this.props.history.push('/movie/' + this.state.movieType + '/' + page)
     }
}