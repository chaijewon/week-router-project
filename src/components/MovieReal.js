import React,{Component} from "react";
import axios from 'axios'
class MovieReal extends Component{
    constructor(props) {
        super(props);
        this.state={
            movie:[],
            page:1,
            totalpage:0
        }
        this.onPrev=this.onPrev.bind(this);
        this.onNext=this.onNext.bind(this);
    }
    onPrev()
    {
        this.state.page=this.state.page>1?this.state.page-1:this.state.page;
        axios.get("http://localhost:3355/movie_real2",{
            params:{
                page:this.state.page
            }
        }).then((result)=>{
            this.setState({movie:result.data});
        })
    }
    onNext()
    {
        this.state.page=this.state.page<this.state.totalpage?this.state.page+1:this.state.page;
        axios.get("http://localhost:3355/movie_real2",{
            params:{
                page:this.state.page
            }
        }).then((result)=>{
            this.setState({movie:result.data});
        })
    }
    componentDidMount() {
       axios.get("http://localhost:3355/movie_real2",{
           params:{
               page:this.state.page
           }
       }).then((result)=>{
           this.setState({movie:result.data});
       })

        axios.get("http://localhost:3355/movie_total",{
            params:{
                cateno:1
            }
        }).then((result)=>{
            this.setState({totalpage:result.data.total})
        })
    }

    render()
    {
        const html=this.state.movie.map((m)=>
            <div className="col-md-4">
                <div className="thumbnail">
                    <a href="/w3images/lights.jpg">
                        <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                        <div className="caption">
                            <p>{m.title}</p>
                        </div>
                    </a>
                </div>
            </div>
        )
        return (
            <React.Fragment>
                <div className={"row"}>
                    {html}
                </div>
                <div className={"row text-center"}>
                    <button className={"btn btn-lg btn-primary"} onClick={this.onPrev}>이전</button>
                    {this.state.page} page / {this.state.totalpage} pages
                    <button className={"btn btn-lg btn-primary"} onClick={this.onNext}>다음</button>
                </div>
            </React.Fragment>

        )
    }
}
export default MovieReal