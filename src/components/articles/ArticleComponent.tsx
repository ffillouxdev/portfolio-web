import { ArticleModel } from '@/models/ArticleModel';
import React from 'react'

interface ArticleModelProps{
    articleData : ArticleModel;
}

function ArticleComponent({articleData} : ArticleModelProps) {
  return (
    <div className='article'>
      <p>
        {articleData.date}
      </p>
    </div>
  )
}

export default ArticleComponent;
