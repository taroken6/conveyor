General Documentation
---------------------

There are two types of pages in the framework, Index and Detail. 

An index page holds all instances of a specific model and has the form ``\<modelName>``. There is one index page per model.

A detail page holds all data related to a specific instance of a model and has the form ``\<modelName>\<id>``. There are as many detail pages as there are instances of a model. 

Detail pages also support nested tabs which more can be read on in the tab documentation below. The url structure is ``\<modelName>\<id>\<pillId>\<pillId>\...`` where each level of the nested tab adds its pill id to the url.
