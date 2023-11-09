import { Post } from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import './global.css'
import styles from './App.module.css'
import { PostType } from './components/Post'

//author: { avatar_url: ""  , name: "" , role:""}
// publishedAt : Date
// content: String

export function App() {

  const posts: PostType[] = [
    {
      id: 1,
      author:
      {
        avatarUrl: "https://github.com/rayzen2002.png",
        name: "Emanuel Magalhaes",
        role: "Dev Fullstack",
      },content: [
        {type: 'paragraph' , content: 'fala galeraa'},
        {type: 'paragraph' ,content: 'Acabei de subir um Lorem ipsum dolor sit amet consectetur adipisicing.'},
        {type: 'link' , content: 'jane.design/doctorcare'}
      ],
      publishedAt: new Date('2023-11-08 15:00:00')
    },
    {
      id: 2,
      author:
      {
        avatarUrl: "https://github.com/diego3g.png",
        name: "Antonia Carmo",
        role: "Dev Fullstack",
      },content: [
        {type: 'paragraph' , content: 'fala galeraa'},
        {type: 'paragraph' ,content: 'Acabei de subir um Lorem ipsum dolor sit amet consectetur adipisicing.'},
        {type: 'link' , content: 'jane.design/doctorcare'}
      ],
      publishedAt: new Date('2023-11-08 16:00:00')
    }
  ]
  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post=>{
            return (
              <Post  
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
     
    </div>
  )
  }
