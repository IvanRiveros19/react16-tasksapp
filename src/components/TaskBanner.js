import React from 'react';

export const TaskBanner = props => (
    <h4 className = "bg-primary text-white text-center p-4"> Usuario {props.userName} Tiene {props.taskItems.filter(t=> !t.done).length} por hacer</h4>

)
