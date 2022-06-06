import React from 'react';
import style from './TagsList.module.sass'

const TagsList = ({handleClickHash, todos, soughtHash}) => {
  let listHashes = todos.reduce((acc,todo) => {
    return acc.concat(todo.hashes)
  },[])
  listHashes = [...new Set(listHashes)]

  function isSoughtTag(hash) {
    return soughtHash === hash ? style.activeItem : ''
  }
  return (
    <div className={style.tags}>
      <h4 className={style.title}>Поиск по тегам:</h4>
      <div className={style.tagsList}>
        <span className={`${style.tagItem} ${isSoughtTag(null)}`} onClick={() => handleClickHash(null)}>Все</span>
        {
          listHashes.map(hash => (
              <span
                onClick={() => handleClickHash(hash)}
                className={`${style.tagItem} ${isSoughtTag(hash)}`}
                key={hash}
              >
                    {hash}
              </span>
            )
          )
        }
      </div>
    </div>
  );
};

export default TagsList;