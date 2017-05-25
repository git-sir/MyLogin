var classnames = require('classnames');

var Share = React.createClass({
    getDefaultProps:function() {
        function getMetaContentByName(name){
            return (document.getElementsByName(name)[0] || 0).content;
        }
        return {
            id:"",
            className: "",
            openType: "newWindow",  // newWindow: 新窗口打开， newTab: 新标签打开
            sites: [ "qzone", "qq", "weibo" ],
            url: location.href || "http://www.ucsmy.com/",
            image: (document.images[0] || 0).src || "http://www.ucsmy.com/images/logo.png",
            title: getMetaContentByName('title') || getMetaContentByName('Title') || document.title || " 广东网金控股股份有限公司",
            description: getMetaContentByName('description') || getMetaContentByName('Description') || "广东网金控股股份有限公司，专业互联网技术解决方案提供商，基于ICT融合技术、云计算、大数据和区块链等技术，为通信、金融、企事业等行业客户提供安全、高效的UCS互联网技术解决方案。",
            wechatQrcodeTitle: "微信扫一扫：分享",
            wechatQrcodeText: "微信扫一扫二维码，便可将本文分享至朋友圈。",
            wechatQrcodeImg: "http://www.ucsmy.com/images/logo.png"
        }
    },
    getInitialState:function() {
        return null;
    },
    shareInNewWindow:function(link){
        window.open(link, "_blank");
    },
    render:function() {
        var RootThis = this;

        var sites = this.props.sites;
        var openType = this.props.openType;
        var url = encodeURIComponent(this.props.url);
        var image = encodeURIComponent(this.props.image);
        var title = encodeURIComponent(this.props.title);
        var description = encodeURIComponent(this.props.description);
        var source = encodeURIComponent(document.title);
        var origin = encodeURIComponent(location.origin);

        var className = classnames(
            'ucs-share',
            this.props.className
        );

        var shareTemplates = {
                 qzone: { "title":"qq空间", "name":"qzone", "link":"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+ url +"&title="+ title +"&pics="+ image +"&desc="+ description +"&summary="+ description },
                 weibo: { "title":"新浪", "name":"sina", "link":"http://service.weibo.com/share/share.php?url="+ url +"&appkey=610475664&title="+ description +"&pic="+ image },
                 baidu: { "title":"百度", "name":"baidu", "link":"http://cang.baidu.com/do/add?it="+ title +"&iu="+ url +"&fr=ien#nw=1" },
            googlebuzz: { "title":"谷歌", "name":"googlebuzz", "link":"http://www.google.com/buzz/post?url="+ url +"&imageurl="+ image },
                douban: { "title":"豆瓣", "name":"douban", "link":"http://www.douban.com/share/service?image="+ image +"&href="+ url +"&name="+ title +"&text="+ description },
                renren: { "title":"人人", "name":"renren", "link":"http://widget.renren.com/dialog/share?resourceUrl="+ url +"&srcUrl="+ url +"&title="+ title +"&pic="+ image +"&description="+ description },
               xianguo: { "title":"鲜果", "name":"xianguo", "link":"http://xianguo.com/service/submitdigg/?link="+ url +"&title="+ title },
                  mail: { "title":"邮箱", "name":"mail", "link":"mailto:?subject="+ title +"&body="+ encodeURIComponent('这是我看到了一篇很不错的文章，分享给你看看！\r\n\r\n') + title + encodeURIComponent('\r\n') + url },
               tencent: { "title":"腾讯微博" , "name":"tencent", "link":"http://v.t.qq.com/share/share.php?c=share&a=index&title="+ description +"&appkey=5153746&url="+ url +"&pic="+ image },
                   163: { "title":"163", "name":"163", "link":"http://t.163.com/article/user/checkLogin.do?source="+ source +"&info="+ description +"&images="+ image },
                tianya: { "title":"天涯", "name":"tianya", "link":"http://open.tianya.cn/widget/send_for.php?action=send-html&shareTo=2&url="+ url +"&title="+ description +"&relateTYUserName="+ description +"&picUrl="+ image },
                 ifeng: { "title":"凤凰", "name":"ifeng", "link":"http://t.ifeng.com/interface.php?_c=share&_a=share&sourceUrl="+ source +"&title="+ description +"&pic="+ image },
              linkedin: { "title":"领英", "name":"linkedin", "link":"http://www.linkedin.com/shareArticle?mini=true&ro=true&title="+ title +"&url="+ url +"&summary="+ description +"&source="+ source +"&armin=armin" },
              facebook: { "title":"脸书", "name":"facebook", "link":"https://www.facebook.com/sharer/sharer.php?u="+ url },
               twitter: { "title":"推特", "name":"twitter", "link":"https://twitter.com/intent/tweet?text="+ title +"&url="+ url +"&via="+ origin },
                google: { "title":"谷歌", "name":"google", "link":"https://plus.google.com/share?url="+ url },
                wechat: { "title":"微信", "name":"wechat" },
                    qq: { "title":"qq好友", "name":"qq", "link": "http://connect.qq.com/widget/shareqq/index.html?url="+ url +"&title="+ title +"&source="+ source +"&desc="+ description }
        };

        var wechat = function(site){
            var wechatQrcodeTitle = RootThis.props.wechatQrcodeTitle;
            var wechatQrcodeText = RootThis.props.wechatQrcodeText;
            var wechatQrcodeImg = RootThis.props.wechatQrcodeImg;
            return (
                <li>
                    <a className="share-button share-button-wechat" href='javascript:' title={shareTemplates[site]["title"]} >
                        {shareTemplates[site]["title"]}
                        <div className="wechat-qrcode" >
                            <h4>{wechatQrcodeTitle}</h4>
                            <div className="qrcode">
                                <img src={wechatQrcodeImg} width={100} />
                            </div>
                            <div className='help'>
                                <p>{wechatQrcodeText}</p>
                            </div>
                        </div>
                    </a>
                </li>
            )
        }

        if(openType == "newWindow"){
            //newWindow
            var html = sites.map(function(site, i){
                if(site === "wechat"){
                    return wechat(site);
                }else{
                    return (
                        <li>
                            <a className={"share-button share-button-"+ shareTemplates[site]["name"]} id="" href="javascript:void(0);" title={shareTemplates[site]["title"]} onClick={RootThis.shareInNewWindow.bind(this, shareTemplates[site]["link"])}>
                                {shareTemplates[site]["title"]}
                            </a>
                        </li>
                    )
                }
            });
        }else{
            // newTab
            var html = sites.map(function(site, i){
                if(site === "wechat"){
                    return wechat(site);
                }else{
                    return (
                        <li>
                            <a className={"share-button share-button-" + shareTemplates[site]["name"]} id=""
                               href={shareTemplates[site]["link"]} title={shareTemplates[site]["title"]}
                               target="_blank">
                                {shareTemplates[site]["title"]}
                            </a>
                        </li>
                    )
                }
            });
        }

        return (
            <div className={className}>
                <ul>
                    <li>分享到：</li>
                    {html}
                </ul>
            </div>
        )
    }
});


module.exports = Share;