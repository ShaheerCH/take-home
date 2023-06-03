import './Card.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Card() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json'
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(
      date
    );

    const day = date.getDate();
    let daySuffix;
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
    } else {
      daySuffix = 'th';
    }

    const NewDate = formattedDate.replace(/\b(\d{1,2})\b/, `$1${daySuffix}`);

    return formatDate;
  }

  const renderCard = data.map((card, index) => {
    return (
      <div className="col-4" key={index}>
        <div className="p-card u-align--left">
          <div>
            <h2 className="p-heading--5 u-no-margin--bottom">
              {card._embedded['wp:term'][1][0].name}
            </h2>
            <hr />
            <img
              className="p-card__image"
              src={card.featured_media}
              alt="Card Image"
            />
            <h3>{card.title.rendered}</h3>
          </div>
          <div>
            <p className="italic">
              By{' '}
              <a className="text-uppercase" href="#">
                {card._embedded.author[0].name}
              </a>{' '}
              on {formatDate(card.date)}
            </p>
            <hr className="u-no-margin--bottom" />
            <p className="post u-padding-top text-uppercase u-no-margin--bottom">
              {card.type}
            </p>{' '}
          </div>
        </div>
      </div>
    );
  });

  return <div className="row u-margin--top">{renderCard}</div>;
}
