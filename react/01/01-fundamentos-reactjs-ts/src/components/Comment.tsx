import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps{
  content: string;
  onDeleteComment: (commnet: string) => void;
}
export function Comment(props: CommentProps){
  const [likeCount , setLikeCount] = useState(0);
  function handleDeleteComment(){
    props.onDeleteComment(props.content)
  }
  function handleLikeComment(){
    setLikeCount(likeCount + 1)
  }
  return(
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/rayzen2002.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Emanuel Magalhaes</strong>
              <time title="08 de novembro ás 09:40h" dateTime='2023-11-08 09:40:00 '>Cerca de 1h atras</time>
            </div>
            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24}/>
            </button>
          </header>
          <p>{props.content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>

  )
}