import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import { CardProps, Post } from './Card';
import styles from './Form.module.css';
import { v4 as uuidv4 } from 'uuid';

interface FormProps {
  onSubmit: (post: Post) => void;
}

const defaultCard: CardProps = {
  title: '',
  body: '',
};
export const Form = ({ onSubmit }: FormProps) => {
  const [card, setCard] = useState<CardProps>(defaultCard);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name.trim();
    setCard({ ...card, [name]: e.target.value.trim() });
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault(); // If button inside form is type "submit" by default, need preventdefault since on submit will refresh the page
    if (!card.title || !card.body) {
      console.error('Empty form!!');
      return;
    }
    const newPost: Post = {
      title: card.title,
      body: card.body,
      userId: 1,
      id: uuidv4(),
    };
    onSubmit(newPost);
    onClear();
  };
  const onClear = () => {
    setCard({ ...card, title: '', body: '' });
  };
  return (
    <form className={styles.form_container}>
      <h3> New post </h3>
      <label>
        Title:
        <input
          name="title"
          placeholder="Title goes here.."
          value={card.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Body:
        <textarea
          name="body"
          rows={4}
          cols={50}
          placeholder="Type your message here.."
          value={card.body}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};
