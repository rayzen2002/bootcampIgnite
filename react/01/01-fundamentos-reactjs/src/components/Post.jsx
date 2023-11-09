import { Comment } from './Comment'
import styles from './Post.module.css'
import { Avatar } from './Avatar'
import { format, formatDistanceToNow} from 'date-fns'
import  ptBR  from 'date-fns/locale/pt-BR'
import { useState } from 'react'
export function Post(props){
  const [comments, setComments] = useState([
    1,
    2,
  ])
  const [newCommentText , setNewCommentText] = useState('')

  const publishedDateFormated = format(props.publishedAt, "d 'de' LLLL 'ás' HH:mm'h'" , {
    locale: ptBR,
  })
  const publishedDayRelativeToNow = formatDistanceToNow(props.publishedAt , {
    locale: ptBR,
    addSuffix: true,
  })
  function handleCreateNewComment(ev){
    ev.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText('')
  }
  function handleNewCommentChange(){
    event.target.setCustomValidity('')
    setNewCommentText (event.target.value)
  }
  function deleteComment(commentToDelete){
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })
    setComments(commentsWithoutDeletedOne)
  }
  function handleNewCommentInvalid(){
    event.target.setCustomValidity('Esse campo é obrigatório')
  }
  const isNewCommentEmpty = newCommentText.length === 0;
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={props.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{props.author.name}</strong>
            <span>{props.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormated} dateTime={props.publishedAt.toISOString()}>
          {publishedDayRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {props.content.map(line=> {
          if(line.type === 'paragraph'){
            return <p key={line.content}>{line.content}</p>
          }else if(line.type === 'link'){
            return <p key={line.content}><a>{line.content}</a></p>
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu Feedback</strong>
        <textarea 
          name='comment'
          value={newCommentText}
          placeholder='deixe um comentário'
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
        })}
      </div>
    </article>
  )
}