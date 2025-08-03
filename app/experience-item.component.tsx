import * as React from "react";
import styles from './experience-item.module.css'

interface ExperienceItemProps {
    dateStart: Date,
    dateEnd: Date,
    name: string,
    description: string,
    technologies: Array<string>
    className: string
}


const ExperienceItem: React.FC<ExperienceItemProps> = (props) => {
    const {dateStart, dateEnd, name, description, technologies, className} = props;

    const cardClasses = `${styles.card} ${className}`.trim()

    return (
    <div className={cardClasses}>
    {/* Header with name and dates */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          {name}
        </h3>
        <div className={styles.dateContainer}>
          <svg className={styles.dateIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {dateStart.toLocaleDateString(undefined, {year: 'numeric', month:'short'})} - {dateEnd.toLocaleDateString(undefined, {year: 'numeric', month:'short'})}
        </div>
      </div>

      {/* Description */}
      <p className={styles.Description} 
         dangerouslySetInnerHTML = {{__html: description}}
        />

      {/* Technologies */}
      <div className={styles.techContainer}>
        {technologies.map((tech, index) => (
          <span
            key={index}
            className={styles.techTag}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>);
}


export default ExperienceItem;