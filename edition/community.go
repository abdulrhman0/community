// Copyright 2016 Documize Inc. <legal@documize.com>. All rights reserved.
//
// This software (Documize Community Edition) is licensed under
// GNU AGPL v3 http://www.gnu.org/licenses/agpl-3.0.en.html
//
// You can operate outside the AGPL restrictions by purchasing
// Documize Enterprise Edition and obtaining a commercial license
// by contacting <sales@documize.com>.
//
// https://documize.com

// This package provides Documize as a single executable.
package main

import (
	"fmt"

	"github.com/documize/community/core/api"
	"github.com/documize/community/core/api/endpoint"
	"github.com/documize/community/core/api/request"
	"github.com/documize/community/core/env"
	"github.com/documize/community/domain/section"
	"github.com/documize/community/edition/boot"
	"github.com/documize/community/edition/logging"
	_ "github.com/documize/community/embed" // the compressed front-end code and static data
	_ "github.com/go-sql-driver/mysql"      // the mysql driver is required behind the scenes
)

var rt env.Runtime

func main() {
	// runtime stores server/application level information
	rt := env.Runtime{}

	// wire up logging implementation
	rt.Log = logging.NewLogger()

	// define product edition details
	rt.Product = env.ProdInfo{}
	rt.Product.Major = "1"
	rt.Product.Minor = "50"
	rt.Product.Patch = "2"
	rt.Product.Version = fmt.Sprintf("%s.%s.%s", rt.Product.Major, rt.Product.Minor, rt.Product.Patch)
	rt.Product.Edition = "Community"
	rt.Product.Title = fmt.Sprintf("%s Edition", rt.Product.Edition)
	rt.Product.License = env.License{}
	rt.Product.License.Seats = 1
	rt.Product.License.Valid = true
	rt.Product.License.Trial = false
	rt.Product.License.Edition = "Community"

	// parse settings from command line and environment
	rt.Flags = env.ParseFlags()
	flagsOK := boot.InitRuntime(&rt)

	if flagsOK {
		// runtime.Log = runtime.Log.SetDB(runtime.Db)
	}

	// temp code repair
	api.Runtime = rt
	request.Db = rt.Db

	section.Register(rt)

	ready := make(chan struct{}, 1) // channel is used for testing
	endpoint.Serve(ready)
}