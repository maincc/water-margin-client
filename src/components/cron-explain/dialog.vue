<template>
  <div id="cron-explain">
    <el-dialog :visible.sync="visible" width="1000px">
      <div slot="title" class="title">
        {{ $t("message.cronExplain.title") }}
      </div>
      <div class="content">
        <div>策略执行频率为cron表达式。</div>

        <div class="content-title">一、结构</div>
        <div>
          cron结构一共有7个字段(用空格隔开)，通常使用格式为6个字段(第7个字段可省略)，从左到右分别是：秒
          分 小时 日期 月份 星期几 年份（可为空）。
        </div>

        <div class="content-title">二、各字段含义</div>
        <div>
          <span>
            <span class="bold-text">1. 秒(second)：</span>
            表示秒数，取值范围0-59，允许使用通配符* , - /
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">2. 分(minute)：</span>
            表示分钟数，取值范围0-59，允许使用通配符* , - /
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">3. 小时(hour)：</span>
            表示小时数，取值范围0-23，允许使用通配符* , - /
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">4. 日期(day of month)：</span>
            表示一个月中的哪一天，取值范围1-31，允许使用通配符* , - / ? L W C
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">5. 月份(month)：</span>
            表示月份，取值范围1-12，或者是JAN-DEC，允许使用通配符* , - /
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">6. 星期几(day of week)：</span>
            表示星期几，取值范围1-7(1表示星期一，7表示星期天)，或者是SUN-SAT，允许使用通配符*
            , - / ? L C #
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">7. 年份(year)：</span>
            表示年份，取值范围1970-2099，允许使用通配符* , - /
          </span>
        </div>

        <div class="content-title">三、通配符说明</div>
        <div>
          <span>
            <span class="bold-text">星号(*)：</span>
            可用在所有字段中，表示对应时间域的每一个时刻，例如，
            在分钟字段时，表示“每分钟”；
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">问号(?)：</span>
            该字符只在日期和星期字段中使用，它通常指定为“无意义的值”，相当于点位符；
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">减号(-)：</span>
            表达一个范围，如在小时字段中使用“10-12”，则表示从10到12点，即10,11,12；
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">逗号(,)：</span>
            表达一个列表值，如在星期字段中使用“MON,WED,FRI”，则表示星期一，星期三和星期五；
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">斜杠(/)：</span>
            x/y表达一个等步长序列，x为起始值，y为增量步长值。如在分钟字段中使用0/15，则表示为0,15,30和45秒，而5/15在分钟字段中表示5,20,35,50，你也可以使用*/y，它等同于0/y；
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">L：</span>
            该字符只在日期和星期字段中使用，代表“Last”的意思，但它在两个字段中意思不同。L在日期字段中，表示这个月份的最后一天，如一月的31号，非闰年二月的28号；如果L用在星期中，则表示星期六，等同于7。但是，如果L出现在星期字段里，而且在前面有一个数值X，则表示“这个月的最后X天”，例如，6L表示该月的最后星期五；
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">W：</span>
            该字符只能出现在日期字段里，是对前导日期的修饰，表示离该日期最近的工作日。例如15W表示离该月15号最近的工作日，如果该月15号是星期六，则匹配14号星期五；如果15日是星期日，则匹配16号星期一；如果15号是星期二，那结果就是15号星期二。但必须注意关联的匹配日期不能够跨月，如你指定1W，如果1号是星期六，结果匹配的是3号星期一，而非上个月最后的那天。W字符串只能指定单一日期，而不能指定日期范围；
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">LW组合：</span>
            在日期字段可以组合使用LW，它的意思是当月的最后一个工作日；
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">井号(#)：</span>
            该字符只能在星期字段中使用，表示当月某个工作日。如6#3表示当月的第三个星期五(6表示星期五，#3表示当前的第三个)，而4#5表示当月的第五个星期三，假设当月没有第五个星期三，忽略不触发；
          </span>
        </div>
        <div>
          <span>
            <span class="bold-text">C：</span>
            该字符只在日期和星期字段中使用，代表“Calendar”的意思。它的意思是计划所关联的日期，如果日期没有被关联，则相当于日历中所有日期。例如5C在日期字段中就相当于日历5日以后的第一天。1C在星期字段中相当于星期日后的第一天。
          </span>
        </div>

        <div class="content-title">四、cron表达式示例</div>
        <div>
          <span>
            <span style="color: rgba(240, 145, 62, 1)" class="bold-text"
              >0 0/5 * * * *
            </span>
            每5分钟触发一次
          </span>
        </div>
        <div>
          <span>
            <span style="color: rgba(240, 145, 62, 1)" class="bold-text"
              >0 10 0/1 * * *
            </span>
            每隔1小时的第10分触发一次
          </span>
        </div>
        <div>
          <span>
            <span style="color: rgba(240, 145, 62, 1)" class="bold-text"
              >0 15 10 ? * *
            </span>
            每天10点15分触发
          </span>
        </div>
        <div>
          <span>
            <span style="color: rgba(240, 145, 62, 1)" class="bold-text"
              >0 15 10 * * ?
            </span>
            每天10点15分触发
          </span>
        </div>
        <div>
          <span>
            <span style="color: rgba(240, 145, 62, 1)" class="bold-text"
              >0 15 10 * * ? *
            </span>
            每天10点15分触发
          </span>
        </div>
        <div>
          <span>
            <span style="color: rgba(240, 145, 62, 1)" class="bold-text"
              >0 15 10 * * ? 2005
            </span>
            2005年每天10点15分触发
          </span>
        </div>
        <div style="margin-bottom: 30px">
          Cron表达式对特殊字符的大小写不敏感，对代表星期的缩写英文大小写也不敏感。
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AccountRole } from "@/js/constant/account";

export default {
  name: "Dialog",
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapGetters(["allModules"]),
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
#cron-explain {
  .el-dialog {
    border-radius: 30px;
    .el-dialog__header {
      padding: 16px 20px 15px;
      border-bottom: 1px solid rgba(232, 233, 234, 1);
    }
    .el-dialog__body {
      padding: 30px 40px 0px;
    }
  }
}
</style>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  color: rgba(43, 44, 47, 1);
  text-align: left;
  vertical-align: top;
}
.content {
  height: 570px;
  overflow: auto;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(81, 86, 95, 1);
  .content-title {
    font-size: 14px;
    font-weight: 600;
    color: rgba(43, 44, 47, 1);
    margin: 15px 0 10px;
    text-align: left;
    width: 100%;
  }
  .bold-text {
    font-size: 14px;
    font-weight: 600;
    color: rgba(43, 44, 47, 1);
  }
}
.btn-group {
  display: flex;
  justify-content: center;
  .btn {
    width: 100px;
    height: 36px;
    border-radius: 20px;
  }
  .cancle {
    border: 1px solid rgba(232, 233, 234, 1);
    font-size: 14px;
    color: rgba(81, 86, 95, 1);
    &:hover {
      color: rgba(127, 127, 227, 1);
      border: 1px solid rgba(132, 132, 221, 1);
    }
  }
  .confirm {
    background: rgba(132, 132, 221, 1);
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
