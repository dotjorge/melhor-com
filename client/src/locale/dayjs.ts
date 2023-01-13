import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br', {
  name: 'pt-br',
  weekdays:
    'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'
      .split('_')
      .map(day => {
        const [first, ...rest] = day.split('')
        return `${first.toUpperCase()}${rest}`
      }),
  weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
  weekdaysMin: 'Do_Seg_Ter_Qua_Qui_Sex_Sá'.split('_'),
  months:
    'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'
      .split('_')
      .map(day => {
        return `${day[0].toUpperCase()}${day.slice(1)}`
      }),
  monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
  ordinal: function (e) {
    return e + 'º'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
  },
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    s: 'poucos segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  }
})
