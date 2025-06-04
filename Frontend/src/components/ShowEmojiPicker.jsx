import React from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function ShowEmojiPicker({ onEmojiClick }) {
    return (
        <div className="absolute bottom-full mb-2 z-50">
            <EmojiPicker onEmojiClick={(emojiData) => onEmojiClick(emojiData.emoji)} />
        </div>
    );
}
