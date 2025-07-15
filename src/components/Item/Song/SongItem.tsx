import React from 'react';

import './SongItem.scss'; // Import SCSS file

interface SongItemProps {
  image: string;
  title: string;
  artist?: string;
  onClick?: () => void;
}


const SongItem: React.FC<SongItemProps> = ({ image, title, artist, onClick  }) => {
  return (
    <div className="song-item" onClick={onClick}>
      <div className="song-item__image-wrapper">
        <img src={image} alt={title} className="song-item__image" />
        <div className="song-item__overlay">
          <div className="song-item__play-icon"></div> {/* Tam giác */}
        </div>
        {/* Lớp viền cam mờ sẽ được tạo bằng pseudo-element hoặc box-shadow */}
      </div>
      <div className="song-item__info">
        <h3 className="song-item__title">{title}</h3>
        {artist && <p className="song-item__artist">{artist}</p>}
      </div>
    </div>
  );
};

export default SongItem;