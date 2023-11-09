import { Comment } from './Comment'
import styles from './Post.module.css'
import { Avatar } from './Avatar'
import { format, formatDistanceToNow} from 'date-fns'
import  ptBR  from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Content{
  type: 'paragraph' | 'link';
  content: string;

}
interface Author {
  name: string ,
  role: string,
  avatarUrl: string,
}
interface postProps{
  post: PostType;
}
export interface PostType{
  id?: number;
  author: Author;
  publishedAt: Date;
  content: Content[]
}
export function Post({post}:postProps){
  const [comments, setComments] = useState([
    'Que post bacana ein amigao',
  ])
  const [newCommentText , setNewCommentText] = useState('')

  const publishedDateFormated = format(post.publishedAt, "d 'de' LLLL 'ás' HH:mm'h'" , {
    locale: ptBR,
  })
  const publishedDayRelativeToNow = formatDistanceToNow(post.publishedAt , {
    locale: ptBR,
    addSuffix: true,
  })
  function handleCreateNewComment(event: FormEvent){
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText('')
  }
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')
    setNewCommentText (event.target.value)
  }
  function deleteComment(commentToDelete: string){
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })
    setComments(commentsWithoutDeletedOne)
  }
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse campo é obrigatório')
  }
  const isNewCommentEmpty = newCommentText.length === 0;
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormated} dateTime={post.publishedAt.toISOString()}>
          {publishedDayRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map(line=> {
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