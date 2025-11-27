
import React from 'react';
import type { Avatar } from '../types/index.ts';

const AvatarDisplay: React.FC<{ avatar: Avatar }> = ({ avatar }) => {
    return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <g fill={avatar.skinColor} dangerouslySetInnerHTML={{ __html: avatar.base }} />
            <g dangerouslySetInnerHTML={{ __html: avatar.eyes }} />
            <g dangerouslySetInnerHTML={{ __html: avatar.hair }} />
            <g dangerouslySetInnerHTML={{ __html: avatar.mouth }} />
            {avatar.accessory && <g dangerouslySetInnerHTML={{ __html: avatar.accessory }} />}
        </svg>
    );
};

export default React.memo(AvatarDisplay);
