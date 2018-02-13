import { connect } from 'react-redux';
import EventCard from '../components/EventCard';

export default connect(() => ({
    organizer: {
        name: 'Bim Sala Bim',
        username: 'bimsalab',
        email: 'bimsalab@netcompany.com',
        avatar: 'event.jpg'
    },
    event: {
        title: 'Go kart!',
        subtitle: '',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
        picture: 'event.jpg'
    }
}))(EventCard);