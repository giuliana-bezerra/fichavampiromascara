import React, { Component } from 'react';
import {FullCalendar} from 'primereact/fullcalendar';

export default class Calendario extends Component {
    render() {
        // Config de testes
        let fullcalendarOptions = {
			defaultDate: new Date(),
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,listMonth'
			},
            editable: true,
            buttonIcons: false,
            locale: 'pt-br',
            buttonText: {
                today: "Hoje",
                month: "Mês",
                week: "Semana",
                day: "Dia",
                listMonth: "Compromissos"
            }
        };

        let events = [
            {
                title: 'Birthday Party',
                start: new Date()
            }
        ];
        
        return (
            <div className="p-col-12">
                <div className="card card-w-title">
                    <h1>Calendário de Sessões</h1>
                    <FullCalendar events={events} options={fullcalendarOptions}/>
                </div>
            </div>
        );
    }
}