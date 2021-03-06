'use strict';

const Connpass = require('../index.js');
const groupname = 'iotlt';
const community = new Connpass(`https://${groupname}.connpass.com/`);

(async () => {
    const cd = {}; // community data

    cd.name = groupname;
    cd.groupId = await community.getGroupId(); //グループIDを取得
    cd.event_count = await community.getEventCount(); //イベント総数
    cd.presentation = await community.getPresentationCount(); //プレゼン数
    cd.presentationPerEvent = cd.presentation / cd.event_count; //1回あたりの登壇数平均
    cd.next_events = await community.getNextEventsInfo(); //次回開催イベント情報

    cd.monthly_events = await community.getMonthlyHoldingsCount(); //月ごとの開催数
    cd.month_count = Object.keys(cd.monthly_events).length; //開催月数
    cd.monthly_ave = cd.event_count / cd.month_count; //月間のイベント開催の平均回数

    cd.yearly_events = await community.getYearlyHoldingsCount(); //年間の開催数
    cd.yearly_count = Object.keys(cd.yearly_events).length; //開催年数
    cd.yearly_ave = cd.event_count / cd.yearly_count; //年間のイベント開催の平均回数

    cd.uniq_member = await community.getUniqMemberCount(); //ユニークメンバー数
    cd.total_member = await community.getTotalMemberCount(); //述べ参加人数
    cd.new_rate = cd.uniq_member / cd.total_member; //新規率

    console.log(cd);
})();