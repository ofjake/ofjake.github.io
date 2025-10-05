document.addEventListener('DOMContentLoaded', () => {
  const components = {
    header: `
      <tr><td style="line-height:110%;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" ><a href="$DealershipUrl" target="_blank" data-surl-type="General" data-surl-meta1="Header"><img src="https://placehold.co/648x200" alt="$fwHeaderAltText" class="flex" style="border-width:0;display:block;-ms-interpolation-mode:bicubic;line-height:100%;width:100%;height:auto;" /></a></td></tr>
    `,
    button: `
      <tr>
        <td style="vertical-align:bottom; padding-top:20px;padding-bottom:20px;padding-right:0px;padding-left:0px;line-height:110%;background-color:#ffffff;">
          <table width="284" role="presentation" align="center" style="border-spacing:0;Margin:0 auto;font-family:Arial, Helvetica, sans-serif;" >
              <tr>
                <td height="54" style="height:54px;width:284px;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;line-height:110%;font-size:14px;background-color:#179ad7;border-width:0;border-style:none;border-color:#179ad7;border-radius:0;color:#ffffff;text-decoration:none;text-transform:uppercase;text-align:center;font-weight: bold;"><a href="$ScheduleLink.AppendParams('utm_source=affinitiv&utm_medium=email_ondemand&utm_campaign=$CampaignType&utm_term=headercta&utm_content=Schedule_service')" data-surl-type="Scheduler" data-surl-meta1="scheduleService" target="_blank" style="line-height:110%;text-decoration:none;color:#ffffff;">Schedule Service</a></td>
              </tr>
          </table>
        </td>
      </tr>
    `,
    bodycopy: `
      <tr>
        <td style="font-size:0px;text-align:left;line-height:110%;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
          <table width="100%" role="presentation" style="border-spacing:0;Margin:0 auto;font-family:Arial, Helvetica, sans-serif;" >
            <tr>
              <td style="font-size:24px;color:#000000;padding-top:20px;padding-bottom:0px;padding-right:20px;padding-left:20px;text-align:left;line-height:110%;" ><p id="body" class="EditField" data-maxlength="150" style="Margin-top:0;Margin-bottom:15px;line-height:110%;" >Service more, for less. Book an appointment today.</p></td>
            </tr>
            <tr>
<td style="font-size:14px;color:#000000;text-align:left;padding-top:0;padding-bottom:20px;padding-right:20px;padding-left:20px;line-height:110%;" ><pre style="white-space:pre-line;font-family:Arial, Helvetica, sans-serif;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;Margin-top:0px;Margin-bottom:0px;word-break:break-word;display:inline;line-height:110%;font-size:14px;" ><p id="Body1" class="EditField" style="Margin-top:0;Margin-bottom:0px;white-space:pre-line;font-family:Arial, Helvetica, sans-serif;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;word-break:break-word;display:inline;line-height:110%;font-size:14px;" >For a limited time only, the more you service, the less you spend! During the Buy More, Save More Event at DealershipName, take advantage of dedicated care from our experts along with exceptional offers. We'll help you keep your vehicle in the best condition for the best value.

Don't wait: schedule your appointment today.</p></pre></td>
            </tr>
          </table>
        </td>
      </tr>
    `,
  };

  const preview = document.getElementById('preview');
  const copyBtn = document.getElementById('copyCodeBtn');
  let currentCode = '';

  document.querySelectorAll('.sidebar ul li').forEach(item => {
    item.addEventListener('click', () => {
      const componentKey = item.getAttribute('data-component');
      currentCode = components[componentKey] || 'Component not found.';
      preview.innerHTML = currentCode;
    });
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(currentCode).then(() => {
      const tooltip = document.getElementById('tooltipA');
      tooltip.style.display = 'block';
      setTimeout(() => {
        tooltip.style.display = 'none';
    }, 500);
    });
  });
});






function showCodeBlock(blockId) {
  const codeBlock = document.getElementById(blockId).cloneNode(true);
  codeBlock.style.display = 'block'; // Ensure it's displayed
  appendCodeBlock(blockId);
}

function appendCodeBlock(blockId) {
  const codeBlockText = document.querySelector(`#${blockId} pre code`).innerText;
  const codeTextarea = document.getElementById('codeTextarea');
  codeTextarea.value += codeBlockText;
}

function copyCode(blockId, tooltipId) {
  const codeBlock = document.querySelector(`#${blockId} pre code`).innerText;
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = codeBlock;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextarea);

  const tooltip = document.getElementById(tooltipId);
  tooltip.style.display = 'block';
  setTimeout(() => {
      tooltip.style.display = 'none';
  }, 500);
}

function copyAllCode() {
  const codeTextarea = document.getElementById('codeTextarea');
  codeTextarea.select();
  document.execCommand('copy');

  const tooltip = document.getElementById('tooltipAll');
  tooltip.style.display = 'block';
  setTimeout(() => {
      tooltip.style.display = 'none';
  }, 500);
}