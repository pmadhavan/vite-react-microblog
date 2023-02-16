import styles from './Card.module.css';
export interface Post {
  id: string | number;
  userId: number;
  title: string;
  body: string;
  tags?: string[];
  reactions?: number;
}
export type CardProps = Pick<Post, 'title' | 'body'>;
export const Card = ({ title, body }: CardProps) => {
  return (
    <div className={styles.card_container}>
      <div className="post">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
};
