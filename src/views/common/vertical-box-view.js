define(["views/common/layer-view"], function(LayerView) {

    var VerticalBoxView = LayerView.extend({

        initialize: function() {
            VerticalBoxView.__super__.initialize.call(this);
            this.useChildrenWidth = false;
        },

        render: function() {
            this.$el.addClass("js-vertical-box-view");
            return VerticalBoxView.__super__.render.call(this);
        },

        layout: function() {
            var children = this.childrenViews(),
                maxWidth = 0,
                padding = this.padding(),
                offset = padding.top(),
                useChildrenWidth = this.useChildrenWidth;
            _.each(children, function(view) {
                view.layoutIfNeeded();
                view.bounds().setX(padding.left()).setY(offset);
                offset += view.bounds().height();
                if (useChildrenWidth)
                    maxWidth = Math.max(maxWidth, view.bounds().width());
            });
            this.bounds().setHeight(offset - padding.top());
            if (useChildrenWidth)
                this.bounds().setWidth(maxWidth);
            this.setNeedsLayout(false);
        },

        setUseChildrenWidth: function(value) {
            if (value == this.useChildrenWidth)
                return;
            this.useChildrenWidth = value;
            this.setNeedsLayout(true);
        }
    });

    return VerticalBoxView;

});